package com.example.syFinal.global;

public class PageUtil {
	public static final int PAGE_SCALE = 10;
	public static final int BLOCK_SCALE = 10;

	private int curPage;
	private int prevPage;
	private int nextPage;
	private int totPage;

	private int totBlock;
	private int curBlock;
	private int prevBlock;
	private int nextBlock;

	private int pageBegin;
	private int pageEnd;
	private int blockStart;
	private int blockEnd;

	public PageUtil(int count, int curPage) {
		curBlock = 1;
		this.curPage = curPage;
		setTotPage(count);
		setPageRange();
		setTotBlock();
		setBlockRange();
	}

	public void setTotBlock() {
		totBlock = (int) Math.ceil(totPage * 1.0 / BLOCK_SCALE);
	}

	public void setBlockRange() {
		curBlock = (int) Math.ceil((curPage - 1) / BLOCK_SCALE) + 1;

		blockStart = (curBlock - 1) * BLOCK_SCALE + 1;
		blockEnd = blockStart + BLOCK_SCALE - 1;

		if (blockEnd > totPage) {
			blockEnd = totPage;
		}

		prevPage = curBlock == 1 ? 1 : (curBlock - 1) * BLOCK_SCALE;
		nextPage = curBlock > totBlock ? (curBlock * BLOCK_SCALE) : (curBlock * BLOCK_SCALE) + 1;

		if (nextPage >= totPage) {
			nextPage = totPage;
		}
	}

	public void setPageRange() {
		pageBegin = (curPage - 1) * PAGE_SCALE + 1;
		pageEnd = pageBegin + PAGE_SCALE - 1;
	}

	public void setTotPage(int count) {
		totPage = (int) Math.ceil(count * 1.0 / PAGE_SCALE);
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getPrevPage() {
		return prevPage;
	}

	public void setPrevPage(int prevPage) {
		this.prevPage = prevPage;
	}

	public int getNextPage() {
		return nextPage;
	}

	public void setNextPage(int nextPage) {
		this.nextPage = nextPage;
	}

	public int getTotBlock() {
		return totBlock;
	}

	public int getCurBlock() {
		return curBlock;
	}

	public void setCurBlock(int curBlock) {
		this.curBlock = curBlock;
	}

	public int getPrevBlock() {
		return prevBlock;
	}

	public void setPrevBlock(int prevBlock) {
		this.prevBlock = prevBlock;
	}

	public int getNextBlock() {
		return nextBlock;
	}

	public void setNextBlock(int nextBlock) {
		this.nextBlock = nextBlock;
	}

	public int getPageBegin() {
		return pageBegin;
	}

	public void setPageBegin(int pageBegin) {
		this.pageBegin = pageBegin;
	}

	public int getPageEnd() {
		return pageEnd;
	}

	public void setPageEnd(int pageEnd) {
		this.pageEnd = pageEnd;
	}

	public int getBlockStart() {
		return blockStart;
	}

	public void setBlockStart(int blockStart) {
		this.blockStart = blockStart;
	}

	public int getBlockEnd() {
		return blockEnd;
	}

	public void setBlockEnd(int blockEnd) {
		this.blockEnd = blockEnd;
	}

	public static int getPageScale() {
		return PAGE_SCALE;
	}

	public static int getBlockScale() {
		return BLOCK_SCALE;
	}

	public int getTotPage() {
		return totPage;
	}
}