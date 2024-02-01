import { useState, useEffect } from "react";
import axios from "axios";
import scss from "./TodoList.module.scss";

const url =
	"https://elchocrud.pro/api/v1/c0815726022cbcf15b3719fed5621ea4/tolon";

const TodoList = () => {
	const [todo, setTodo] = useState([]);
	const [title, setTitle] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [newEdit, setNewEdit] = useState(false);
	const [newItemId, setNewItemId] = useState("");

	const [titleVlue, setTitleValue] = useState("");
	const [imageVlue, setImageValue] = useState("");
	const [descriptionValue, setDescriptionValue] = useState("");

	const handleAdd = async () => {
		const newData = {
			title: title,
			image: image,
			description: description,
		};
		const response = await axios.post(url, newData);
		setTodo(response.data);
		setTitle("");
		setImage("");
		setDescription("");
	};

	const getTodos = async () => {
		const response = await axios.get(url);
		setTodo(response.data);
	};

	const deleteTodo = async (id) => {
		const response = await axios.delete(`${url}/${id}`);
		setTodo(response.data);
	};

	const updateTodoValue = (id) => {
		const filterData = todo.find((item) => item._id === id);
		setNewItemId(id);
		setTitle(filterData.title);
		setImage(filterData.image);
		setDescription(filterData.description);
	};

	const updateTodo = async () => {
		const updatedData = {
			title: titleVlue,
			image: imageVlue,
			description: descriptionValue,
		};
		const response = await axios.put(`${url}/${newItemId}`, updatedData);
		setTodo(response.data);
		setNewEdit(false);
		setTitle("");
		setImage("");
		setDescription("");
	};
  

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
        <div className={scss.divBar}>
			<center>
				<h1 className={scss.list}>I love todo ♡</h1>
				<input
					className={scss.inputs1}
					type="text"
					placeholder="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				<br />
				<input
					className={scss.inputs1}
					type="url"
					placeholder="image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<br />
				<br />
				<input
					className={scss.inputs1}
					type="text"
					placeholder="title"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<br />
				<button onClick={handleAdd}>Add♡</button>
			</center>

      </div>

			{todo.map((item) => (
				<div key={item._id}>
					{newEdit && newItemId === item._id ? (
						<div className={scss.div1}>
							<center>
								<h1 className={scss.todo}>TodoList♡</h1>
								<input className={scss.input2}
									type="text"
									placeholder="text"
									value={titleVlue}
									onChange={(e) => setTitleValue(e.target.value)}
								/>
								<br />
								<br />
								<input className={scss.input2}
									type="url"
									placeholder="image"
									value={imageVlue}
									onChange={(e) => setImageValue(e.target.value)}
								/>
								<br />
								<br />
								<input className={scss.input2}
									type="text"
									placeholder="title"
									value={descriptionValue}
									onChange={(e) => setDescriptionValue(e.target.value)}
								/>
								<br />
								<br />
								<button onClick={handleAdd}>Add♡</button>
								<button onClick={updateTodo}>Save♡</button>
							</center>
						</div>
					) : (
						<div className={scss.card}>
							<img src={item.image} alt={item.title} />
							<h1>{item.title}</h1>
							<p>{item.description}</p>
						</div>
					)}
					<div className={scss.edit}>
						<button
							onClick={() => {
								deleteTodo(item._id);
							}}>
							Delete♡
						</button>
						<button
							onClick={() => {
								setNewEdit(!newEdit);
								updateTodoValue(item._id);
							}}>
							Edit♡
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default TodoList;
