From [](https://github.com/lorenwest/node-config/wiki/Configuration-Files)
Files in the config directory are loaded in the following order:

default.EXT
default-{instance}.EXT
{deployment}.EXT
{deployment}-{instance}.EXT
{short_hostname}.EXT
{short_hostname}-{instance}.EXT
{short_hostname}-{deployment}.EXT
{short_hostname}-{deployment}-{instance}.EXT
{full_hostname}.EXT
{full_hostname}-{instance}.EXT
{full_hostname}-{deployment}.EXT
{full_hostname}-{deployment}-{instance}.EXT
local.EXT
local-{instance}.EXT
local-{deployment}.EXT
local-{deployment}-{instance}.EXT

Where

    EXT can be .yml, .yaml, .coffee, .cson, .properties, .json, .json5, .hjson or .js depending on the format you prefer (see below)
    {instance} is an optional instance name string for Multi-Instance Deployments
    {short_hostname} is your server name up to the first dot, from the $HOST or $HOSTNAME environment variable or os.hostname() (in that order). For example if your hostname is www.example.com then it would load www.EXT.
    {full_hostname} is your whole server name, you may use this when {short_hostname} collides with other machines.
    {deployment} is the deployment name, from the $NODE_ENV environment variable

The default.EXT file is designed to contain all configuration parameters from which 
other files may overwrite. Overwriting is done on a parameter by parameter basis, so 
subsequent files contain only the parameters unique for that override.

{hostname} and {deployment} files allow you to tune configurations for a particular 
server or deployment. These files are designed to live along with other files in your 
version control system.

The local files are intended to not be tracked in your version control system. 
External configuration management tools can write these files upon application deployment, 
before application loading.
