# StudyBuddy

## Team Members
Bhavani Rishitha Ravipati <br>
Neethi Shetty <br>
Nishank Sharma <br>
Priyanka Sundaram <br>
Reshma Morampudi <br>
Yash Sapra <br>

## Deployment 
Execute the following Commands 
`gcloud app deploy Web/app.yaml python-app/api.yaml`

### Create project on GCP 
```
gcloud projects create [PROJECT_ID]

gcloud projects describe [PROJECT_ID]

gcloud app create --project=[PROJECT_ID]

gcloud config set [PROJECT_ID] 
```

### Setup project locally
Clone the repo from gitHub and build using npm 
```
git clone [repo address]

cd repo 

npm install

npm run build 

npm start -- starts the server on localhost:3000
````

### Deploy application to Google App Engine 

Create `app.yaml` and execute the following commands 
```
gcloud app deploy app.yaml

gcloud app browse 
```
