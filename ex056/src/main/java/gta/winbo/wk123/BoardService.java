package gta.winbo.wk123;

import java.util.List;



public interface BoardService {
	public List<BoardVO> selectUser(BoardVO v) throws Exception;
	public void insert(BoardVO v) throws Exception;
	public void update(BoardVO v) throws Exception;
	public void delete(BoardVO v) throws Exception;
}
