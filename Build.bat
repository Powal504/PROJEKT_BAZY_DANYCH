cd ./frontend
start cmd /k npm install
start cmd /k npm run dev

cd ../zarz/api
start cmd /k dotnet watch run
pause

