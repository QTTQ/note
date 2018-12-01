func (w *Worker) startWorker() {
	for c=w.ticker.C {
		//这种 在通道中不适合  因为这个是队列  同步得  要用下边得 select
	}

	for {
		select {
		case <- w.ticker.C:
			go w.runner.StartAll()
		}
	}
}