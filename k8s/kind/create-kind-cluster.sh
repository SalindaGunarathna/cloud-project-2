#!/bin/bash

echo "=== Starting KIND Cluster for Node.js Microservices ==="

# Create KIND cluster with custom config
kind create cluster --name nodejs-microservices --config kind-config.yaml

echo "=== Installing NGINX Ingress Controller ==="

# Install NGINX Ingress Controller for KIND
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# Wait for ingress controller to be ready
echo "Waiting for ingress controller to be ready..."
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=90s

echo "=== KIND Cluster Started Successfully ==="
echo "Cluster: nodejs-microservices"
echo "To deploy the application:"
echo "1. kubectl apply -f k8s/manifests/infrastructure/"
echo "2. kubectl apply -f k8s/manifests/applications/"