from pymongo import MongoClient
from pymongo.encryption import Algorithm, ClientEncryption
from pymongo.encryption_options import AutoEncryptionOpts

master_key = ... # Put your master key here
kms_providers = {'local': {'key': master_key}}

schema_map = {...} # Your encryption schema

auto_encryption_opts = AutoEncryptionOpts(
    kms_providers=kms_providers,
    schema_map=schema_map,
    key_vault_namespace="admin.datakeys"
)

client = MongoClient('mongodb://localhost:27017', auto_encryption_opts=auto_encryption_opts)