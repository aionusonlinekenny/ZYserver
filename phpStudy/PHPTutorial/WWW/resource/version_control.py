#!/usr/bin/python 
# coding: UTF-8

import os
import glob
import sys, getopt
import re
import shutil
import codecs
import ConfigParser
import hashlib
import json
from zlib import crc32
import binascii
import time
#Ä¬ÈÏÒª´ò°üµÄ¸ùÂ¼¾¶
filter_name = ["CompileRes.lua","default.res.json","default.res1.json","default.res2.json","default.thm.json","packEui.bat","publishSkin.bat","StartLua.bat","version.json"];
folder_name = ".svn";
data = {}
def main(): 
	os.system("StartLua.bat")
	depth_md5();
	save_version();
	#get_version();
	save_versionZip();

def get_version():
	version_data = time.strftime('%Y%m%d%H%M%S',time.localtime(time.time()));
	data["v"] = version_data;
	version_data = json.dumps(data);
	f = open("version.json","w");
	f.write(version_data);
	f.close();	
	
	
def save_versionZip():
	source_path1 = "default.res2.json";
	source_path2 = "version.json";
	source_path3 = "version.txt";
	zip_path = "version1.me";
	if(os.path.exists(zip_path)):
		os.remove("version1.me");
	
	#os.system("zip -r " + zip_path + " " + source_path1 + " " + source_path2)
	os.system("zip -r " + zip_path + " " + source_path1 + " " + source_path3)
	
def save_version():
	version_data = json.dumps(data);
	f = open("version.json","w");
	f.write(version_data);
	f.close();
	
def depth_md5():
	for parent,dirnames,filenames in os.walk(os.getcwd()):
		num = parent.find(folder_name);
		if num > -1:
			continue;
		for file_name in filenames:
			path = os.path.join(parent, file_name);
			num1 = path.find(".exml")
			if(num1 == -1):
				relative_path = os.path.relpath(parent)
				md5_str = GetFileMd5(path);
				print(md5_str);
				md5_str = md5_str[:8];
				try:
					filter_name.index(file_name)
				except:	
					if md5_str == None:
							break;
					# print(path)
					splitext = os.path.splitext(file_name);
					relative_path = re.sub(r'\\', "/", relative_path)
					data[relative_path+"/"+file_name] = md5_str;					
					continue;
				else:
					print("else");
					continue;	
					

def GetFileMd5(filename):
	if not os.path.isfile(filename):
		return
	myhash = hashlib.md5()
	f = file(filename,'rb')
	while True:
		b = f.read(8096)
		if not b :
			break
		myhash.update(b)
	f.close()
	return myhash.hexdigest()	
		
main();