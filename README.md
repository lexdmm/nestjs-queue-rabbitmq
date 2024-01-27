## Description

[Queue](https://github.com/netser-ai/queue) Queue Service built on the NestJS framework. In this service, RabbitMQ is used to manage message queues. You can see more about this link [RabbitMQ com NestJS](https://docs.nestjs.com/microservices/rabbitmq)

In this service we find two modules:
- producer: provides routes for services to send requests with messages to the queue. It listens and replicates messages to the queue.
- consumer: consumes received messages to process them according to their arrival order in RabbitMQ and implementing some business rule.

## Producer Details 
This module always accesses two ports, both in development and production environments, they are:
- **5672**: is the queue messaging port with RabbitMQ's RMQ protocol
- **3000**: this is the port for http requests available for services that need to use the messaging queue.

The environment variables used **in Producer** are listed below and can be seen in **.env-template**:
```bash
# RMQ port
PORT_RMQ=5672

# app port
PORT=3000

# Queue names identify their function, think of a good name when entering a new one.
QUEUE_NAME='translation_prompts'

# Url rabbitMQ authentication
RABBITMQ_USER='guest'
RABBITMQ_PASSWORD='guest'
RABBITMQ_HOST='localhost'
```
The routes for other services to use the queue service are created in **../producer.controller.ts**, once the route is configured there, everything sent in the request body (body) will be sent to the consumer through the method (this.client.send) within **../producer.service.ts**.

## Consumer Details 
This service always has three doors, both in development and production environments, they are:
- **5672**: is the queue messaging port with RabbitMQ's RMQ protocol
- **15672**: this is the port to access RabbitMQ Manager at the link [localhost:15672](localhost:15672), to do this you must go to your local machine and log in with the default username and password **"guest"* *.

The environment variables used **in Consumer** are listed below and can be seen in **.env-template**:
```bash
# RABBITMQ
# consumer's port
PORT_RMQ=5672
PORT_RMQ_MANAGEMENT=15672

# Queue name
QUEUE_NAME='translation_prompts'

# Queue credentials, obviously production is not like that
RABBITMQ_USER='guest'
RABBITMQ_PASSWORD='guest'
RABBITMQ_HOST='localhost'
```

The consumer has a control to receive requests from the producer, it is located at the source **consumer/src/consumer.controller.ts**, it receives the message in the request body (body) through **@MessagePattern** and does any necessary business rule within **/home/menescal/development/queue/consumer/src/consumer.service.ts**, such as saving a file or doing some other necessary routine

## Connections
#### 1 - Install project dependencies
Since there are two modules, each must be installed and run individually.
Run the command below to install the dependencies within each folder:
```bash
# ../consumer
$ yarn install
```
```bash
# ../producer
$ yarn install
```

## Run app
Before running the Queue service, you must have Docker installed and run the command below in the root of the project to upload the RabbitMQ services.
```bash
# to run the containers
$ docker compose up
```
```bash
# to destroy the container
$ docker compose down
```
Once the RabbitMQ service is active in docker, run the command below for development in each project (Consumer and Producer). You can improve this by copying everything into the container with dockerfile if you prefer.
```bash
# ../consumer
$ yarn run start:dev
```
```bash
# ../producer
$ yarn run start:dev
```
