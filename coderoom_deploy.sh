mvn clean install
cd target/
rm -vf $JBOSS_HOME/standalone/deployments/coderoom*
cp -v coderoom.war $JBOSS_HOME/standalone/deployments/
