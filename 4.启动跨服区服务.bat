cd "D:\ZYserver\server\bin\s99\dbserver"
start DBServer64_debug.exe
ping localhost -n 2
cd "D:\ZYserver\server\bin\s99\gameworld"
start GameWorld64_debug.exe
ping localhost -n 2
cd "D:\ZYserver\server\bin\s99\gateway"
start Gateway64_debug.exe