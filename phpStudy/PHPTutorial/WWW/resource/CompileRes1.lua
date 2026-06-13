require("lfs")

local resPath = string.gsub(lfs.currentdir(), "\\", "/")
local keys = ""
local keysArr = {}
local res = "\"resources\": [ \n"
local groups = "{\n \"groups\": [\n{\n \"keys\": "
local res1 = "\"resources\": [ \n"
local keysArr1 = {}
local keys1 = ""
local groups1 = "{\n \"groups\": [\n{\n \"keys\": "
local file4 = io.open(resPath.."/default.res4.json", "w");--指定路径，指定文件打开方式
local res2 = "\"resources\": [ \n"
local keysArr2 = {}
local keys2 = ""
local groups2 = "{\n \"groups\": [\n{\n \"keys\": "
local res3 = "\"resources\": [ \n"
local keysArr3 = {}
local keys3 = ""
local groups3 = "{\n \"keys\": "
local version = "";
local jsonArr = {}


function Split(s, p)  
	if s == nil then
        return nil;
    end
    if p == nil then
        return s;
    end
    local rt= {};
    s = tostring(s);
    string.gsub(s, '[^'..p..']+', function(w) table.insert(rt, w) end );
    return rt;
end

function decodeJson(url)
		local file1 = io.open(url, "r");--指定路径，指定文件打开方式
		local readJson;
		local s = ""
		readJson = file1:read("*all");--读取内容
		file1:close();
		if string.find(url, 'config') ~= nil then
			return s
		end
		local json = require("json")
		local data = json.decode(readJson)
		if data.frames == nil then
			return s
		end
		for i,v in pairs(data.frames) do
			if s~="" then
				s = s..","
			end
			s = s..i
		end
	return s
end

function attrdir(path, url,typeNum)
	
	local isSubkeys = true
	local url = url or ""
	
	if(typeNum == 2) then
		for file in lfs.dir(path) do
			if file ~= "." and file ~= ".." then
				local list = Split(file, ".")
				local type = ""
				if list[2] == "png" or list[2] == "jpg" then
					type = "image"
				elseif list[2] == "json" then
					if isSubkeys == true then
						type = "sheet"
					else
						type = "sheet"
					end	
				elseif list[2] == "mp3" then
					type = "sound"
				elseif list[2] == "fnt" then
					type = "font"
				elseif list[2] == "me" then
					type = "bin"
				end
				if list[2] == nil then
					attrdir(path.."/"..file,url..file.."/",1)
				elseif type ~= "" then
					local name = list[1].."_"..list[2]
					res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
						"\"type\""..": ".."\""..type.."\""..",\n"..
						"\"name\""..": ".."\""..name.."\"".."\n"..
						"},\n"
					keys = keys..name..","
					table.insert(keysArr,name)
					res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
						"\"type\""..": ".."\""..type.."\""..",\n"..
						"\"name\""..": ".."\""..name.."\"".."\n"..
						"},\n"
					keys3 = keys3..name..","
					table.insert(keysArr3,name)					
				end		
			end	
		end	
	elseif(typeNum == 1) then
		for file in lfs.dir(path) do
			if file ~= "." and file ~= ".." then
				local list = Split(file, ".")
				local type = ""
				if list[2] == "png" or list[2] == "jpg" then
					type = "image"
				elseif list[2] == "json" then
					if isSubkeys == true then
						type = "sheet"
					else
						type = "sheet"
					end	
				elseif list[2] == "mp3" then
					type = "sound"
				elseif list[2] == "fnt" then
					type = "font"
				elseif list[2] == "me" then
					type = "bin"
				end
				if list[2] == nil then
					attrdir(path.."/"..file,url..file.."/",1)
				elseif type == "" then
				
				elseif isSubkeys == true and list[2] == "json" then 
					local subkeys = decodeJson(path.."/"..file)
					local name = list[1].."_"..list[2]
					for _,v in pairs(keysArr) do
						if v == name then
							print("rename: "..url..file)
						end
					end	
					if subkeys == "" then
						type = "json"
						res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							
						if file ~= "config.json" then	
							res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							keys3 = keys3..name..","
							table.insert(keysArr3,name)
						end			
					else
						res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\""..",\n"..
							"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
							"},\n"
							
						local index4 = url.find(url,"createrole")
						if index4 == null then
							if type == "sheet" then
								res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\""..",\n"..
								"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
								"},\n"
								keys3 = keys3..name..","
								table.insert(keysArr3,name)
							else
								res2 = res2.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\""..",\n"..
								"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
								"},\n"
								keys2 = keys2..name..","
								table.insert(keysArr2,name)
							end
						else
							res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\""..",\n"..
							"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
							"},\n"
							keys1 = keys1..name..","
							table.insert(keysArr1,name)
						end
					keys = keys..name..","
					table.insert(keysArr,name)
					end
				else
					local name = list[1].."_"..list[2]
					local isAddRes = true
					for _,v in pairs(keysArr) do
						if v == name then
							print("Erro rename: "..url..file)
						end	
						if v == list[1].."_json" then
							isAddRes = false
						end
					end
					if isAddRes then
						if type == "font" then
							res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							keys3 = keys3..name..","
							table.insert(keysArr3,name)
							res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\"".."\n"..
								"},\n"
							keys = keys..name..","
							table.insert(keysArr,name)
						elseif type == "bin" then
							res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							keys3 = keys3..name..","
							print("rename: "..url..file)
							table.insert(keysArr3,name)
						else
							local index = url.find(url,"icons")
							local index2 = url.find(url,"common")
							if index == null then
								if index2 ~=nil then
									res1 = res1.."{\n".."\"url\""..": ".."\""..url..file..version.."\""..",\n"..
									"\"type\""..": ".."\""..type.."\""..",\n"..
									"\"name\""..": ".."\""..name.."\"".."\n"..
									"},\n"
									keys3 = keys3..name..","
									table.insert(keysArr1,name)
								else
									res2 = res2.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
									"\"type\""..": ".."\""..type.."\""..",\n"..
									"\"name\""..": ".."\""..name.."\"".."\n"..
									"},\n"
									keys2 = keys2..name..","
									table.insert(keysArr2,name)
								end
							else
								res2 = res2.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\"".."\n"..
								"},\n"
								keys2 = keys2..name..","
								table.insert(keysArr2,name)
							end
							res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							keys = keys..name..","
							table.insert(keysArr,name)
						end
					end
				end
			end
		end	
	else
		for file in lfs.dir(path) do
			if file ~= "." and file ~= ".." then
				local list = Split(file, ".")
				local type = ""
				if list[2] == "png" or list[2] == "jpg" then
					type = "image"
				elseif list[2] == "json" then
					if isSubkeys == true then
						type = "sheet"
					else
						type = "sheet"
					end	
				elseif list[2] == "mp3" then
					type = "sound"
				elseif list[2] == "fnt" then
					type = "font"
				elseif list[2] == "me" then
					type = "bin"	
				end
				
				if list[2] == nil then
					attrdir(path.."/"..file,url..file.."/",0)
				elseif type == "" then
					
				elseif isSubkeys == true and list[2] == "json" then 
					local subkeys = decodeJson(path.."/"..file)
					local name = list[1].."_"..list[2]
					for _,v in pairs(keysArr) do
						if v == name then
							print("rename: "..url..file)
						end
					end
					if subkeys == "" then
						type = "json"
						res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
							
						res1 = res1.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
					print("rename: "..url..file)			
					else
						res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\""..",\n"..
							"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
							"},\n"
							
						local index4 = url.find(url,"common")
						if index4 == null then
							res2 = res2.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\""..",\n"..
								"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
								"},\n"
							keys2 = keys2..name..","
							table.insert(keysArr2,name)
						else
							res1 = res1.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
								"\"type\""..": ".."\""..type.."\""..",\n"..
								"\"name\""..": ".."\""..name.."\""..",\n"..
								"\"subkeys\""..": ".."\""..subkeys.."\"".."\n"..
								"},\n"
							keys1 = keys1..name..","
							table.insert(keysArr1,name)
						end	
					end
					keys = keys..name..","
					table.insert(keysArr,name)

					keys1 = keys1..name..","
					table.insert(keysArr1,name)
				else
					local name = list[1].."_"..list[2]
					local isAddRes = true
					for _,v in pairs(keysArr) do
						if v == name then
							print("Erro rename: "..url..file)
						end	
						if v == list[1].."_json" then
							isAddRes = false
						end
					end
					if isAddRes then
						res = res.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
						keys = keys..name..","	
						table.insert(keysArr,name)
						res1 = res1.."{\n".."\"url\""..": ".."\""..url..file.."\""..",\n"..
							"\"type\""..": ".."\""..type.."\""..",\n"..
							"\"name\""..": ".."\""..name.."\"".."\n"..
							"},\n"
						keys1 = keys1..name..","	
						table.insert(keysArr1,name)
					end
				end
			end
		end
	end
end

function fileReadJson(source_path)  
    local file = io.open(source_path, "r");  
    local json = file:read("*a");  
    file:close();  
    return json;  
end

function stringSplit(input, delimiter)
    input = tostring(input)
    delimiter = tostring(delimiter)
    if (delimiter=='') then return false end
    local pos,arr = 0, {}
    for st,sp in function() return string.find(input, delimiter, pos, true) end do
        table.insert(arr, string.sub(input, pos, st - 1))
        pos = sp + 1
    end
    table.insert(arr, string.sub(input, pos))
    return arr
end 

function main(path)
	
	version = "?"..os.time()
	attrdir(path.."/config1","config1/",1)
	attrdir(path.."/eui","eui/",1)
	attrdir(path.."/icons","icons/",1)
	attrdir(path.."/image","image/",1)
	attrdir(path.."/audio","audio/",1)
	attrdir(path.."/rolePreload","rolePreload/",2)

	
	res1 = string.sub(res1,1,-3)
	res1 = res1.."\n]\n}"
	
	keys3 = string.sub(keys3,1,-2)
	groups3 = groups3.."\""..keys3.."\",\n\"name\": \"delayPreload\"\n}"
	
	keys1 = string.sub(keys1,1,-2)
	groups1 = groups1.."\""..keys1.."\",\n\"name\": \"preload\"\n},"..groups3.."\n],"
	
	
	file4:write(groups1)
	file4:write(res1);--写入的内容
	file4:close();
	
	
	--print("Success")
end

main(resPath)
--attrdir("D:/H5/client/resource/image/dieguide", "image/dieguide/")