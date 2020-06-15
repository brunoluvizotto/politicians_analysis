from google.oauth2.service_account import Credentials
from os import environ
import json


def get_crendentials(google_credentials):
    scopes = (
        "https://www.googleapis.com/auth/bigquery",
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/drive",
    )
    credentials = Credentials.from_service_account_info(
        json.loads(google_credentials))
    credentials = credentials.with_scopes(scopes)
    return credentials


GOOGLE_CREDENTIALS_POLITICIANS = get_crendentials(environ["GOOGLE_CREDENTIALS_POLITICIANS"])
