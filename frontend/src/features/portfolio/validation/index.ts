import * as yup from 'yup';

export const portfolioSchema = yup.object().shape({
  name: yup.string().required('作品名を入力してください'),
  userId: yup.number().required(),
  description: yup
    .string()
    .required('作品の説明文を入力してください')
    .min(100, '100文字以上500文字以下で入力してください')
    .max(500, '100文字以上500文字以下で入力してください'),
  status: yup.number().nullable(),
  tags: yup.array().of(yup.number()),
  gitHubLink: yup.string(),
  shareLink: yup.string()
});
