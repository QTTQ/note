//写函数bmi计算身体质量指数（bmi =体重/身高^ 2）。
// 如果bmi <= 18.5返回“体重不足”
// 如果bmi <= 25.0返回“Normal”
// 如果bmi <= 30.0返回“超重”
// 如果bmi> 30返回“肥胖”
bmi = (w, h) => (w = w / h / h) > 30 ? 'Obese' : w > 25 ? 'Overweight' : w > 18.5 ? 'Normal' : 'Underweight';

// 将所有元音替换为句子中的感叹号。aeiouAEIOU是元音。
replace=s=>s.replace(/[aeiou]/gi, '!');