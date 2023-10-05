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
        stage('Build and Push Docker Image') {
            steps {
                 script {
                     def containerName = 'dev_rc'
                     def existingContainerId = sh(script: "docker ps -a -q -f name=${containerName}", returnStatus: true)
                     if (existingContainerId.toString().length()>0) {
                         // Xóa container cũ nếu tồn tại
                         sh "docker rm -f ${containerName}"
                     }
                     // Tạo container mới
                     sh 'docker run -itd --name dev_rc -p 5061:5062 -e ASPNETCORE_ENVIRONMENT=Development ntquan87/nodejs-app-ci-cd:latest'
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
