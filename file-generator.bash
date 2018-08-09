#! /bin/bash

echo "Creating files ..."
mkdir $1
cd $1

touch "$1.tsx"
echo "$1.tsx"

touch "$1.test.tsx"
echo "$1.test.tsx"

touch "$1.less"
echo "$1.less"

touch "index.js"
echo "index.js"

# Split command line arg on -
if [[ $1 = *"-"* ]]; then
  IFS='-'
  for word in $1; do
    length=${#word}
    first_letter="$(tr '[:lower:]' '[:upper:]' <<< ${word:0:1})"
    word=$first_letter${word:1:length}
    camel_cased_name+=$word
  done
  echo $camel_cased_name
IFS='-'
fi

# Write boilerplate to files
printf "import * as React from 'react';\n\n" > "$1.test.tsx"
printf "import { Enzyme } from '';\n\n" >> "$1.test.tsx"
printf "import { $camel_cased_name } from './$1';" >> "$1.test.tsx" 

printf "import * as React from 'react';\n\n" > "$1.tsx"
printf "import * as styles from './$1.less';" >> "$1.tsx"

printf "export * from './$1';" > "index.js"

echo "Done"

# TODO Handle names with a '.' (new-project.dialog)