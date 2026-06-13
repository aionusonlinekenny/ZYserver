@echo off
::转到当前盘符
%~d0
::打开当前目录
cd %~dp0
echo 已将程序定位到当前目录，开始启动AIR程序 
::执行AIR程序，并向InvokeEvent事件传参数  手 游 源 码 网 w w w . s y    y m w .c o m
..\..\common\client\tools\air\bin\adl ..\..\common\client\tools\air\打包发布版eui\PackExml-app.xml %1