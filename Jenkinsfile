pipeline {
    agent any
    environment {
        ANSIBLE_HOST_KEY_CHECKING = "false"
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/chathurajayasank/contact-us-bmc-car.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Build Application') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy with Ansible') {
            steps {
                script {
                    echo 'Running Ansible playbook for deployment...'
                      // Write the inventory file for localhost
                    writeFile file: 'inventory', text: '''
                    [webservers]
                    localhost ansible_connection=local
                    '''
        
                    // Run the Ansible playbook
                    sh 'ansible-playbook -i inventory deploy-code.yml --become'
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Deployment succeeded.'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
