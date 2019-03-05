# Setting up Node using NVM

Because not all computers are running the same version of Node, 
you might find yourself unable to build your project successfully
from time to time. To remedy that situation, you can use 
Node Version Manager (nvm). This document explains how to set up
and use nvm.

Start by searching for 'nvm' in a browser. The first one that comes
up is usually the right one. It is a GitHub repository creationix/nvm.

There are directions there for installing nvm using `curl` or `wget`. 
Either should work fine, but we used `curl` in the lab when we 
walked through the setup.

The command we used is:
 
 `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash`

This script The script clones the nvm repository to `~/.nvm` and 
adds the source line to your 
profile (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

`cd .nvm`

`nvm`

If typing `nvm` does not find the command, you can use `source ~/.bash_profile` or
follow the instructions on the GitHub repository for the nvm project for 
more options.

To see the versions of Node on your computer, use `nvm list`. The one with
the arrow by it is the one being used right now. You can install another version
by typing `nvm install 10.15.3` or a different version if 10.15.3 is no longer the most current 
version with long term support planned. When you install a new version, it automatically becomes the
default. If you want to switch to a different version of Node manually, use
`nvm use 10.15.3` or whatever version number you want. To see what version of Node you are
using, type `node --version` 