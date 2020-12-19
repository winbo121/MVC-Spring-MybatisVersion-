package gta.winbo.wk123;

import java.util.HashMap;
import java.util.List;

public interface BoardDAO {
	public List<BoardVO> selectUser(BoardVO v) throws Exception;
	public void insert(BoardVO v) throws Exception;
	public void update(HashMap<String,String> map) throws Exception;
	public void delete(BoardVO v) throws Exception;

}
