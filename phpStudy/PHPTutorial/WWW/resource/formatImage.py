#!/usr/bin/python 
# coding: UTF-8

import os
import glob
import sys, getopt
import re
import shutil
import codecs
import ConfigParser
import subprocess
from os import chdir, getcwd, listdir, system


default_packer_root_dir = "G:/work/h5/ha02_cn/h5_client/resource/"
limit_pack_ids = ["audio","config"]  #ÅÅ³ýÄ¿Â¼ÎÄ¼þ

def main():
	depth_packer(default_packer_root_dir);

	
def depth_packer(root_dir):
	dir_list = [];
	dic = {};
	for parent,dirnames,filenames in os.walk(root_dir):
		for file_name in filenames:
			if len((re.compile(r'\.png')).findall(file_name)) > 0:
				file_path = os.path.join(parent, file_name);
				dir_path = os.path.dirname(file_path);
				dir_path = re.sub(r'\\', "/", dir_path);
				num1 = file_path.find(".png");
				num2 = file_path.find(".jpg");
				if num1 != -1 or  num2 != -1:
					if 0 != len(limit_pack_ids):
						num = -1
						for key in limit_pack_ids:
							num = file_path.find(key);
							if num != -1:
								break
								
						if num == -1:
							if None == dic.get(file_path):
								dir_list.append(file_path);
								dic[file_path] = 1;
	if (len(dir_list) <= 0):
		print("[ERROR] root_dir is invalid %s" % root_dir);
		return

	for dir in dir_list:
		print(dir)
		pngquant(dir);		
		

def pngquant(dir):
	cmd = "pngquant %s --force --ext .png --quality 80-80" % (dir);
	os.system(cmd);
	return;		

	
def get_texture_name(dir):
	ary = dir.split("/");
	length = len(ary);
	
	if length <= 0:
		return "";
	
	return ary[length - 1];

	
main();