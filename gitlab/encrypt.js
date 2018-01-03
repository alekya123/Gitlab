const readline = require('readline');
const Blowfish = require('egoroof-blowfish');

const bf = new Blowfish('secretkey', Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
bf.setIv('abcdefgh');
const encoded = bf.encode('85d9de51-c9be-4fa9-9b42-7fb7e6895e98-bluemix');
const encoded1 = bf.encode('803df52405f858eeec6f9d88376b43a66ca56af8b0387f87fcab9484935eef03');
console.log(encoded);
console.log(encoded1);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Enter a secret ', (answer) => { 
    var bf = new Blowfish(answer,Blowfish.MODE.ECB, Blowfish.PADDING.NULL);
    bf.setIv('abcdefgh');
    const decoded = bf.decode(encoded, Blowfish.TYPE.STRING);
    const decoded1 = bf.decode(encoded1, Blowfish.TYPE.STRING);

    console.log(encoded);
  rl.close();
})