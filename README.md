# MicroURL
---
A lightweight simple URL shortener made using Node, Express and uses Mongo DB.


### Endpoints 
- Server Side Render
    ``` GET localhost:8081/ ```
    ```GET localhost:8081/analytics/?short=<shortID>```
- API
    ```GET localhost:8081/api/<shortID>```
    ```GET localhost:8081/api/analytics/<shortID>```
    ```POST localhost:8081/api/ -d { "long":<longID>}```
### Future Updates
- Admin Pannel For Database Control UI (Authenticated)
- User login for url creation 
- Detailed analytics