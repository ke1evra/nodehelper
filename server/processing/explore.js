module.exports = function explore(data){
  let info = {};
  info.headers = []
  for(let title in data[0]){
    info.headers.push({
      name: title,
      header: 'Не определен'
    })
  };

  info.message = `Тест подключения своего модуля. data.length = ${data.length}`;
  // console.log(message);
  return info;
}
