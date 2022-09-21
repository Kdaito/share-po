# Backend
使用言語・技術
* Go
* mux
* Swagger

フォルダ構成について
-
クリーンアーキテクチャにしたい
```
├── adapter
│   │
│   ├── controller
│   │
│   ├── gateway
│   │
│   └── presenter
│
├── driver
│
├── entity
│
└── usecase
    │
    ├── interactor
    │
    └── port

```

 [Go言語とClean ArchitectureでAPIサーバを構築する(Qiita)](https://qiita.com/arkuchy/items/874656b33d2e5acdf281)を参考にして作成