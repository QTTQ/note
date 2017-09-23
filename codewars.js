//写函数bmi计算身体质量指数（bmi =体重/身高^ 2）。
// 如果bmi <= 18.5返回“体重不足”
// 如果bmi <= 25.0返回“Normal”
// 如果bmi <= 30.0返回“超重”
// 如果bmi> 30返回“肥胖”
bmi = (w, h) => (w = w / h / h) > 30 ? 'Obese' : w > 25 ? 'Overweight' : w > 18.5 ? 'Normal' : 'Underweight';

// 将所有元音替换为句子中的感叹号。aeiouAEIOU是元音。
replace=s=>s.replace(/[aeiou]/gi, '!');

// 终端游戏bug挤压

// 您正在创建您最喜爱的棋盘游戏的基于文本的终端版本。
// 在棋盘游戏中，每一轮都有六个步骤，必须按照这个顺序进行：滚动骰子，移动，战斗，获取硬币，
// 购买更多的健康状况和打印状态。
let health = 100,
position = 0,
coins = 0

function main () {
const actions = [rollDice,move,combat,getCoins,buyHealth,printStatus];
actions.forEach(e => e());
}

// 从句子中删除所有感叹号，但在字符串末尾确保感叹号。
// 对于初学者kata，您可以假设输入数据始终为非空字符串，无需验证。
const remove = s => s.split("!").join("") + "!";
//or
function remove(s){
    return s.replace(/!/g, '') + "!"
  }