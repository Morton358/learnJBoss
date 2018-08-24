from org.jboss.as.cli.scriptsupport import CLI
cli = CLI.newInstance()
cli.connect("admin", "morton358")
result = cli.cmd("/subsystem=datasources/data-source=ExampleDS/:read-attribute(name=max-pool-size)")
response = result.getResponse()
print response
cli.disconnect()

