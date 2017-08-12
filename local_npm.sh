#!/usr/bin/env bash

installation() {
  read -rp "Verdaccio not found, install it? [y/N]" response
  if [[ "$response" =~ ^([yY]+$) ]]; then
    echo installing...
    npm install -g verdaccio

    if [ $? -ne 0 ]; then
      echo issue installing verdaccio
      exit 1
    fi
  else
    echo not installing.
  fi
}

postrun() {
  echo resetting registry to ${old_registry}
  npm set registry ${old_registry}
}

ctrl_c() {
  echo "terminating..."
  postrun

  exit
}

run() {
  npm set registry http://localhost:4873/
  verdaccio

  if [ $? -ne 0 ]; then
    echo "couldn't run verdaccio"
    if [ "${1}" != "notfirst" ]; then
      # Failed to run verdaccio, try installation  
      installation
      # try running again, with special arg to avoid infinity
      run notfirst
    else
      echo "something went wrong, quitting to avoid infinite loop"
    fi
  fi

  postrun
}

###############################################################################
#
# ENTRY POINT
#
###############################################################################

old_registry=$(npm get registry)
trap ctrl_c INT 
echo old registry was ${old_registry}, setting temporary

# start our local verdaccio server
run
