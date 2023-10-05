pipeline {
    agent any

    stages {
        stage('Checkout Github') {
            steps {
               git 'https://github.com/ntquan/nodejs-app-ci-cd'
            }
        }

        stage('Build source code (dependencies)') {
            steps {
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                    // Authenticate with the Docker registry
                    withDockerRegistry(credentialsId: 'docker-hub', url: 'https://index.docker.io/v1/') {
                      bat 'docker build -t ntquan87/nodejs-app-ci-cd:v1 .'
                      bat 'docker push ntquan87/nodejs-app-ci-cd:v1'
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
