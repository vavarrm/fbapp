<?php
	class DB{
		public function __construct(){
			$this->link = mysql_connect(DBROOT, DBUSER, DBPASS);
			if(!$this->link){
				die('not connecyl：'.mysql_errno());
			}
			return $this->link;
		}

		public function insert($table, $insert= array()){
			$sqlfuc = array(
				'NOW()'
			);
			if(is_array($insert)){
				foreach($insert as $key =>$temp){
					$filed[] sprintf('`%s`', $key);
					$temp =mysql_real_escape_string(trim($temp));
					if(in_array($value, $sqlfuc){
						$value[] sprintf('%s', $temp);
					}else{
						$value[] sprintf("'%s'", $temp);
					}
				}
			}
			if(!empty($filed) && !empty($value)){
				$filed_str = join(',' $filed);
				$value_str = join(',' $value);
				$sql =sprintf("INSERT %s (%s) VALUES (%s)", $filed_str, $value_str);
				$this->query($sql);
			}
		}
		
		public function query($sql){
			$this->result = mysql_query($sql);
			return $this->result;
		}
	}
?>