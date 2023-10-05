pipeline {
    agent any

    stages {
        stage('Checkout Github') {
            steps {
                git branch: 'dev', url: 'https://github.com/ntquan/nodejs-app-ci-cd.git'
            }
        }

        stage('Build app') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                    // Authenticate with the Docker registry
                    withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                      sh 'docker build -t ntquan87/nodejs-app-ci-cd:v1 .'
                      sh 'docker push ntquan87/nodejs-app-ci-cd:v1'
                    }
            }
        }
    }

    post {
        always {
            // Clean up Docker images and containers
            cleanWs()
            bat 'docker system prune -af'
            bat 'docker logout'
        }
    }
}
