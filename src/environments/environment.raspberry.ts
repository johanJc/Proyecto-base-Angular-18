export const environment = {
    //ng build --base-href /metal-green/ --configuration raspberry

    //   SUBIR 
    /**
        1) sftp ubuntu@192.168.1.4
        2) put dist/metal-green.zip
        3) exit
        4) ssh ubuntu@192.168.1.4
        5) unzip metal-green.zip
        sudo rm -rf metal-green.zip
        sudo rm -rf /var/www/metal-green/*
        sudo mv metal-green/* /var/www/metal-green/
        sudo systemctl restart nginx.service
        6) (contraseña) 4951
        7) exit
    */
    api: 'http://192.168.1.4/metalapi/' // Raspberry
};
