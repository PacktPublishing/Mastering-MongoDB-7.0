#!/bin/bash
# Script to create an Atlas cluster using Helm

# This command installs the atlas-deployment from the MongoDB Helm repository into the Kubernetes cluster.
# It sets up the deployment in the 'my-book' namespace and configures the Atlas project with the necessary credentials and details.

helm install atlas-deployment mongodb/atlas-deployment \
--namespace=my-book \
--create-namespace \
--set project.atlasProjectName='My Project' \
--set atlas.orgId='<orgid>' \  # Replace with your actual organization ID
--set atlas.publicApiKey='<publicKey>' \  # Replace with your actual public API key
--set atlas.privateApiKey='<privateApiKey>'  # Replace with your actual private API key

# Ensure to replace <orgid>, <publicKey>, and <privateApiKey> with your actual Atlas organization ID, 
# public API key, and private API key respectively.
