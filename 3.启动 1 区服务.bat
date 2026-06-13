cd "D:\ZYserver\server\bin\s1\dbserver"
start DBServer64_debug.exe
ping localhost -n 2
cd "D:\ZYserver\server\bin\s1\gameworld"
start GameWorld64_debug.exe
ping localhost -n 2
cd "D:\ZYserver\server\bin\s1\gateway"
start Gateway64_debug.exe