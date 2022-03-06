.PHONY: release
release:
	bundle install
	yarn install
	gcloud builds submit --timeout=900s --config cloudbuild.yaml  --substitutions _SERVICE_NAME=onlinecompanyevent,_SECRET_NAME=RAILS_MASTER_KEY,_PROJECT_ID=online-escape-room-342721,_REGION=europe-central2,_INSTANCE_NAME=company-event

.PHONY: deploy
deploy:
	gcloud run deploy onlinecompanyevent --platform managed --region europe-central2 --image gcr.io/online-escape-room-342721/onlinecompanyevent
