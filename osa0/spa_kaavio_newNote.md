```mermaid
sequenceDiagram
    participant browser
    participant server
    participant payload

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server 
    browser->>payload: sending content {content: "testtest", date: "2023-08-21T09:52:00.426Z"}
    server-->>browser: JSON Message
    payload-->>browser: {message: "note created"}
    receiving JSON message
    deactivate server
```
    