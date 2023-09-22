protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./output \
  --ts_out=service=true:./output \
  -I=./proto \
  ./proto/user.proto