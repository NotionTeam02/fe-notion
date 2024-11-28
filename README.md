# NOTION_TEAM_02

|                    [슈니](https://github.com/schnee98)                     |                   [우디](https://github.com/minjeongHEO)                   |
| :------------------------------------------------------------------------: | :------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/84198371?v=4" width=200> | <img src="https://avatars.githubusercontent.com/u/96780693?v=4" width=200> |
|                                  Frontend                                  |                                  Frontend                                  |
|                             Learning by doing                              |                         가만 놔두면 다 해결 돼...                          |

### 팀 노션

[🎲 Link](https://github.com/NotionTeam02)

### 팀 이슈

[😺 Link](https://github.com/NotionTeam02/fe-notion/issues)

### 구조

[Mermaid Flowcharts - Basic Syntax](https://mermaid.js.org/syntax/flowchart.html)

```mermaid
graph TD;
    A(Article.tsx)
    B(BlockController.tsx)
    C(useBlockController.tsx)
    D(useKeyEvent.tsx)
    E(useCursorStore.tsx):::zustand
    classDef zustand fill:#f96

    F(EditableBlock.tsx)
    G(ParagraphTag)
    H(HeaderTag)
    I(UnorderedItemTag)
    J(OrderedListTag)
    K(OrderedItemTag)
    L(ImageTag)
    Z1(BlockTag.tsx)
    Z2(BlockTag.tsx)
    Z3(BlockTag.tsx)
    Z4(BlockTag.tsx)
    Z5(BlockTag.tsx)

    A-->B
    C-->B
    E-->C
    D-->C
    B-->F
    F-->G
    F-->H
    F-->I
    F-->J
    F-->L
    G-->Z1
    H-->Z2
    I-->Z3
    J-->K
    K-->Z4
    L-->Z5
```

### 팝업

```mermaid
graph TD;
    P1(AddPopup.tsx)
    P2(EditPopup.tsx)
    P3(SubPopup.tsx)
    P4(PreviewPopup.tsx)
    P5(PreviewPopup.tsx)
    Z(BlockTag.tsx)

    Z-->P1 --> P5
    Z-->P2 --> P3 --> P4
```

### 📽
#### 시연
![notion-project](https://github.com/user-attachments/assets/211bb9e7-9194-43ea-9e5b-9ba8f66b6098)
#### 닉네임 로그인, 회원가입
<img src="https://github.com/user-attachments/assets/754e41e4-12f1-4364-8abd-5d9aa5a9464d" width="500"/>
<img src="https://github.com/user-attachments/assets/db53b8d4-b4cb-4985-9a99-825016ae7d6e" width="500"/>
<img src="https://github.com/user-attachments/assets/380df021-fb82-4b9f-a3f5-4f08586a6c82" width="400"/>

#### 팀 스페이스 추가,접속,삭제
<img src="https://github.com/user-attachments/assets/c31e365d-248f-459a-a24e-04d7eaec0f1a" width="400"/>
<img src="https://github.com/user-attachments/assets/e575b515-e6a8-4ae7-b184-3deaa3bb7ed9" width="200"/>
<img src="https://github.com/user-attachments/assets/b0e663e3-a53b-4f26-9fd8-70cb25176522" width="300"/>

#### 팀스페이스 조회, 삭제, 전환
<img src="https://github.com/user-attachments/assets/69f434ea-18f7-4324-a71b-936916c6af0a" width="200"/>

#### 동시 텍스트 작성, 삭제, 블럭생성, `/`팝업들, 블럭옵션 팝업들
<img src="https://github.com/user-attachments/assets/64e5bca8-d642-4ecc-87d7-b514edfe6be4" width="500"/>
<img src="https://github.com/user-attachments/assets/287c84fb-c1de-4fb2-bda8-4861b8a540e3" width="500"/>
<img src="https://github.com/user-attachments/assets/9ad7bc02-3a58-4bb5-8127-5452dff82327" width="200"/>
<img src="https://github.com/user-attachments/assets/7dcf3b9a-5f09-48ee-b6e4-cb62c90a254a" width="300"/>
<img src="https://github.com/user-attachments/assets/df8e4b9a-e1a2-4dc7-b565-61e85a948af0" width="300"/>
<img src="https://github.com/user-attachments/assets/aa591b1d-b9f0-4493-a78e-f9d88059204e" width="300"/>
<img src="https://github.com/user-attachments/assets/6b9497a6-a450-40fe-bd57-59108cbbffa5" width="300"/>
<img src="https://github.com/user-attachments/assets/b7041609-fc20-4cfb-94f6-1f2ff1801094" width="300"/>

### 드래그

<img src="https://github.com/user-attachments/assets/94f72b89-6ad9-4db5-a38b-a60113796854" width="300"/>
