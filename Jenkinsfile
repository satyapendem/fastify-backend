pipeline {
    agent {
        docker {
            image 'node:latest'
            args '-p 3002:3002'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'node server.js'
            }
        }
    }
}
