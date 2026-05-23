cd ~/production-project
# сборка клиента - получаем статику
npm run build:prod

# удаляем старую статику
rm -rf ~/../var/www/production_project/html
# копируем новую статику в папку html
mv ~/production-project/build ~/../var/www/production_project/html