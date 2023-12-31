#!/bin/bash

# This script sets up an Atlas cluster in a Kubernetes environment
# using MongoDB Helm charts and the Atlas Kubernetes Operator.

# Step 1: Add MongoDB Helm charts repository
helm repo add mongodb https://mongodb.github.io/helm-charts

# Step 2: Install Atlas Kubernetes Operator
helm install atlas-operator --namespace=atlas-operator --create-namespace mongodb/mongodb-atlas-operator

# Step 3: Install Atlas Deployment Helm Chart
# Ensure to replace <orgid>, <publicKey>, and <privateApiKey> 
# with your actual Atlas organization ID, public API key, 
# and private API key respectively before running this script.

helm install atlas-deployment mongodb/atlas-deployment \
--namespace=my-book \
--create-namespace \
--set project.atlasProjectName='My Project' \
--set atlas.orgId='<orgid>' \  # Replace with your actual organization ID
--set atlas.publicApiKey='<publicKey>' \  # Replace with your actual public API key
--set atlas.privateApiKey='<privateApiKey>'  # Replace with your actual private API key

