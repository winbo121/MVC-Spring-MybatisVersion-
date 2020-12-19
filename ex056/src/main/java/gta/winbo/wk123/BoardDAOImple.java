package gta.winbo.wk123;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Repository
public class BoardDAOImple implements BoardDAO{

	
	@Inject
	private SqlSession session;

	@Override
	public List<BoardVO> selectUser(BoardVO v) throws Exception {
		return session.selectList("User.selectUser",v);
	}

	@Override
	public void insert(BoardVO v) throws Exception {
		 session.insert("User.insertUser",v);		
	}

	

	@Override
	public void update(HashMap<String,String> map) throws Exception {
		session.update("User.updateUser", map);
		
	}
	
	@Override
	public void delete(BoardVO v) throws Exception {
		 session.delete("User.deleteUser", v);
	}






}
