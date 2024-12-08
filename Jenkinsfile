pipeline {
    agent any
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

                    // Ensure the playbook and inventory are available
                    writeFile file: 'deploy.yml', text: '''
                    --- # Ansible playbook content
                    - hosts: webservers
                      become: yes
                      tasks:
                        - name: Ensure deployment directory exists
                          file:
                            path: /var/www/contact-us-bmc-car
                            state: directory
                            owner: www-data
                            group: www-data
                            mode: '0755'

                        - name: Copy build files to the deployment directory
                          copy:
                            src: ./build/
                            dest: /var/www/contact-us-bmc-car
                            owner: www-data
                            group: www-data
                            mode: '0644'

                        - name: Restart Nginx
                          service:
                            name: nginx
                            state: restarted
                    '''

                    writeFile file: 'inventory', text: '''
                    [webservers]
                    your-server-ip ansible_user=your-username
                    '''

                    // Run the Ansible playbook
                    sh 'ansible-playbook -i inventory deploy.yml'
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
