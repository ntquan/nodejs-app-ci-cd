pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'test_01', description: 'Git branch to build')
    }
    environment {
        REPO_URL = 'https://github.com/ntquan/nodejs-app-ci-cd.git'
        IMAGE_NAME = 'ntquan87/nodejs-app-ci-cd'
    }

    stages {
        stage('Print Branch Name') {
            steps {
                script {
                    echo "Branch selected: ${params.BRANCH_NAME}"
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    // Checkout the specified branch
                    git branch: "${params.BRANCH_NAME}", url: "${REPO_URL}"
                }
            }
        }

        stage('Get Latest Commit') {
            steps {
                script {
                    // Get the latest commit hash
                    LATEST_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Latest Commit Hash: ${LATEST_COMMIT}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Build the Docker image with the commit hash as a tag
                    sh "whoami"
                    sh "docker build -t ${IMAGE_NAME}:${LATEST_COMMIT} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the image to Docker registry (optional)
                    sh "docker push ${IMAGE_NAME}:${LATEST_COMMIT}"
                }
            }
        }
    }

    // post {
    //     always {
    //         // Clean up Docker images and containers
    //         cleanWs()
    //         sh 'docker system prune -af'
    //         sh 'docker logout'
    //     }
    // }
}
