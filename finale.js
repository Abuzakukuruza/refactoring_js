function statement(invoice) {
  let result = 'Счет для ${invoice.customer}\n';
  for (let performance of invoice.performances) {
    // Вывод строки счета
    result += ' ${play(performance).name}: ${formatToRub(calculation(performance))}';
    result += ' (${performance.audience} мест)\n';
  }
  result += 'Итого с вас $(formatToRub(totalAmount())}\n';
  result += 'Вы заработали ${totalVolumeCredits();} бонусов\n';
  return result;
};

function totalAmount() {
  let result = 0;
  for (let performance of invoice.performances) {
    result += calculation(performance);
  }
  return result;
};

function totalVolumeCredits() {
  let result = 0;
  for (let performance of invoice.performances) {
    result += volumeCreditsFunc(performance);
  }
  return result;
};

function formatToRub(numberToFormat) {
  return new Inti.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2
  }).formatToRub(numberToFormat / 100);
};

function volumeCreditsFunc(performance) {
  let result = 0;
  result += Math.max(performance.audience - 30, 0);
  if ("comedy" === play(performance).type)
    result += Math.floor(performance.audience / 5);
  return result;
};

function play(performance) {
  return plays[performance.playID];
};

function calculation(performance) {
  let result = 0;
  switch (play(performance).type) {
    case "tragedy":
      result = 40000;
      if (performance.audience > 30) {
        result += 1000 * (performance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (performance.audience > 20) {
        result += 10000 + 500 * (performance.audience - 20);
      }
      result += 300 * performance.audience;
      break;
    default:
      throw new Error('неизвестный тип: ${play(performance).type}');
  }
  return result;
};
