INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'), ('Finance');

    INSERT INTO role
    (title, salary, department_id)
    VALUES ('engineer', 32000, 1),
    ('administrator', 25000, 2),
    ('closer', 29000, 3);

    INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
    VALUES ('James', 'Black', 1, null),
    ('Sarah', 'Burns', 1, 1),
    ('Ryan', 'Bethell', 1, 1),
    ('Max', 'Smith', 2, null),
    ('Timothy', 'Lynn', 2, 3),
    ('Russel', 'Lee', 3, null),
    ('Chris', 'Rock', 3, 5),
    ('Jane', 'Cordon', 2, 5),
    ('Samantha', 'Adams', 3, 7);