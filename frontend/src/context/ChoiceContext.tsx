import React from 'react';
import { PortfolioStatus, PortfolioTag } from '../openapi';
import { ApiContext } from './ApiContext';

export const ChoiceContext = React.createContext<{
  portfolioStatus: PortfolioStatus[];
  portfolioTag: PortfolioTag[];
  getTextOfChoice: (
    choices: Choices,
    value: number | null | undefined
  ) => string;
  getTextsOfChoice: (choices: Choices, values: number[]) => string[];
}>({
  portfolioStatus: [],
  portfolioTag: [],
  // eslint-disable-next-line
  getTextOfChoice: () => '',
  // eslint-disable-next-line
  getTextsOfChoice: () => {
    return [];
  }
});

type Choices = {
  id?: number;
  text?: string;
}[];

const ChoiceProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [portfolioStatus, setPortfolioStatus] = React.useState<
    PortfolioStatus[]
  >([]);
  const [portfolioTag, setPortfolioTag] = React.useState<PortfolioTag[]>([]);
  const { portfolioTagApi, portfolioStatusApi } = React.useContext(ApiContext);

  React.useEffect(() => {
    const f = async () => {
      const status = await portfolioStatusApi.getPortfolioStatusList();
      const tag = await portfolioTagApi.getPortfolioTagList();
      setPortfolioStatus(status);
      setPortfolioTag(tag);
    };
    f().catch((e) => console.error(e));
  }, [portfolioStatusApi, portfolioTagApi]);

  const getTextOfChoice = React.useCallback(
    (choices: Choices, value: number | null | undefined): string => {
      if (!value) return '選択されていません';
      const text = choices.find((choice) => choice.id === value)?.text;
      return text || '選択されていません';
    },
    []
  );

  const getTextsOfChoice = React.useCallback(
    (choices: Choices, values: number[]): string[] => {
      if (values.length == 0) return [];
      const textsWithUndefined = values.map((value) => {
        return choices.find((choice) => choice.id === value)?.text;
      });
      const texts = textsWithUndefined.filter(
        (text): text is Exclude<typeof text, undefined> => text != undefined
      );
      return texts;
    },
    []
  );

  return (
    <ChoiceContext.Provider
      value={{
        portfolioStatus,
        portfolioTag,
        getTextOfChoice,
        getTextsOfChoice
      }}
    >
      {children}
    </ChoiceContext.Provider>
  );
};

export default ChoiceProvider;
