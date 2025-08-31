#!/bin/bash

echo "=== Loading Local Docker Images to KIND Cluster ==="

# # Build images locally (from project root directory)
# echo "Building Docker images..."

# # Build Customer Service
# echo "Building customer-service..."
# docker build -t customer-service:latest ./customer

# # Build Products Service  
# echo "Building products-service..."
# docker build -t products-service:latest ./products

# # Build Shopping Service
# echo "Building shopping-service..."
# docker build -t shopping-service:latest ./shopping

# # Build React Client
# echo "Building react-client..."
# docker build -t react-client:latest ./client

echo "=== Loading Images into KIND Cluster ==="

# Load images into KIND cluster
kind load docker-image --name nodejs-microservices backend-ms-customer:latest2
kind load docker-image --name nodejs-microservices backend-ms-products:latest2  
kind load docker-image --name nodejs-microservices backend-ms-shopping:latest2
kind load docker-image --name nodejs-microservices backend-ms-client:latest

# Also load infrastructure images
echo "Loading infrastructure images..."
kind load docker-image --name nodejs-microservices mongo:6.0
kind load docker-image --name nodejs-microservices bitnami/rabbitmq:latest
kind load docker-image --name nodejs-microservices nginx:alpine

echo "=== All Images Loaded Successfully ==="
echo "You can now deploy with:"
echo "kubectl apply -f k8s/manifests/infrastructure/"
echo "kubectl apply -f k8s/manifests/applications/"