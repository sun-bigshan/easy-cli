const questions = [
  {
    type: 'input',
    message: '请输入模板名称:',
    name: 'name',
    validate(val) {
      if (!val) return '模板名称不能为空！';
      if (val.match(/[^A-Za-z0-9\u4e00-\u9fa5_-]/g)) return '模板名称包含非法字符，请重新输入';
      return true;
    }
  }
]

module.exports = questions