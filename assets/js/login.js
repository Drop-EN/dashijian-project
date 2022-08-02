$("#link_reg").on("click", function () {
  $(".login-box").hide();
  $(".reg-box").show();
});
$("#link_login").on("click", function () {
  $(".reg-box").hide();
  $(".reg-box").show();
});
const form = layui.form;
// const baseURL = "http://www.liulongbin.top:3007";
const layer = layui.layer;
form.verify({
  //value：表单的值、item：表单的DOM对象
  repass: (value) => {
    //属性选择器需要加空格
    const pwd = $(".reg-box [name=password]").val();
    if (pwd !== value) return "两次密码不一致";
  },
  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
});
$("#form_reg").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "/api/reguser",
    data: {
      username: $("#form_reg [name=username").val(),
      password: $("#form_reg [name=password").val(),
    },
    success: (res) => {
      const { message, status } = res;
      if (status !== 0) return layer.msg(message);
      layer.msg("注册成功！");
      // 注册成功后跳转到登录界面
      $("#link_login").click();
    },
  });
});
//表单提交事件
$("#form_login").on("submit", function (e) {
  e.preventDefault();
  //form.serialize()获取表单内所有的数据
  const data = $(this).serialize();
  $.ajax({
    type: "POST",
    url: "/api/login",
    data,
    success: (res) => {
      const { message, status, token } = res;
      //如果
      if (status != 0) return layer.msg(message);
      localStorage.setItem("token", res.token);
      location.href = "/index.html";
    },
  });
});
