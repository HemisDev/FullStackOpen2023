```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server 
    note over browser,server: {content: "testtest", date: "2023-08-21T09:52:00.426Z"}
    server-->>browser: JSON Message
    note over server,browser: {message: "note created"}
    deactivate server
```
    